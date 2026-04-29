package com.koushik.erp_backend.auth;

import com.koushik.erp_backend.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String token = authService.login(request);
            return ResponseEntity.ok(token);
        } catch (RuntimeException e) {

            if (e.getMessage().equals("USER_NOT_FOUND")) {
                return ResponseEntity.status(404).body("User not found");
            }

            if (e.getMessage().equals("INVALID_PASSWORD")) {
                return ResponseEntity.status(401).body("Invalid password");
            }

            return ResponseEntity.status(500).body("Something went wrong");
        }
    }

    @PostMapping("/register")
    public String register(@RequestBody Employee employee) {
        return authService.register(employee);
    }
}