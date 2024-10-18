package com.example.demo;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

@Repository
public class EpigramRecord {
    private final JdbcTemplate jdbcTemplate;
    private static final String DB_URL = "jdbc:sqlite:epigrams.db";

    public EpigramRecord(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        initializeDatabase();
    }

    private void initializeDatabase() {
        try (Connection conn = DriverManager.getConnection(DB_URL);
                Statement stmt = conn.createStatement()) {
            String sql = "CREATE TABLE IF NOT EXISTS epigrams (\n"
                    + " id INTEGER PRIMARY KEY AUTOINCREMENT,\n"
                    + " text TEXT NOT NULL,\n"
                    + " source TEXT,\n"
                    + " dateAdded TEXT\n"
                    + ");";
            stmt.execute(sql);
        } catch (SQLException e) {
            System.out.println("Error initializing database: " + e.getMessage());
        }
    }

    public void insertEpigram(String text, String source) {
        if (source == null || source.isEmpty()) {
            String sql = "INSERT INTO epigrams (epigram_text, epigram_dateAdded) VALUES (?, DATE('now'))";
            jdbcTemplate.update(sql, text);
        } else {
            String sql = "INSERT INTO epigrams (epigram_text, epigram_dateAdded, epigram_source) VALUES (?, DATE('now'), ?)";
            jdbcTemplate.update(sql, text, source);
        }
    }

    public List<Epigram> EpigramList() {
        String sql = "SELECT * FROM epigrams";
        return jdbcTemplate.query(sql, new EpigramRowMapper());
    }

    public Epigram getEpigram_byId(Long id) {
        String sql = "SELECT * FROM epigrams WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new EpigramRowMapper(), id);
    }

    public void deleteEpigram_byId(Long id) {
        String sql = "DELETE FROM epigrams WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    private static class EpigramRowMapper implements RowMapper<Epigram> {
        @Override
        public Epigram mapRow(@SuppressWarnings("null") ResultSet rset, int row_num) throws SQLException {
            Long id = rset.getLong("epigram_id");
            String text = rset.getString("epigram_text");
            String dateAdded = rset.getString("epigram_dateAdded");
            String source = rset.getString("epigram_source");

            if (source != null) {
                return new Epigram(id, text, dateAdded, source); // Epigram with source
            } else {
                return new Epigram(id, text, dateAdded); // Epigram without source
            }
        }
    }
}
