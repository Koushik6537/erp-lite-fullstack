package com.koushik.erp_backend.auth;

import com.koushik.erp_backend.entity.Employee;
import com.koushik.erp_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private EmployeeRepository repository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String login(LoginRequest request) {

        Employee emp = repository.findByEmail(request.getEmail());

        if (emp == null) {
            throw new RuntimeException("USER_NOT_FOUND");
        }

        if (request.getPassword() != null &&
                passwordEncoder.matches(request.getPassword(), emp.getPassword())) {

            return jwtUtil.generateToken(emp.getEmail(), emp.getRole());
        }

        throw new RuntimeException("INVALID_PASSWORD");
    }

    public String register(Employee employee) {

        // Check if user already exists
        Employee existing = repository.findByEmail(employee.getEmail());

        if (existing != null) {
            throw new RuntimeException("User already exists");
        }

        // Encrypt password
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));

        // Save user
        repository.save(employee);

        return "User registered successfully";
    }
}