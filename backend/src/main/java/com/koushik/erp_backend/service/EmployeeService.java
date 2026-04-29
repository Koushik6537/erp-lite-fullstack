package com.koushik.erp_backend.service;

import com.koushik.erp_backend.entity.Employee;
import com.koushik.erp_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Employee saveEmployee(Employee employee) {
        return repository.save(employee);
    }

    public void deleteEmployee(Long id) {
        repository.deleteById(id);
    }

    public Employee updateEmployee(Long id, Employee employee) {
        Employee existing = repository.findById(id).orElseThrow();

        existing.setName(employee.getName());
        existing.setEmail(employee.getEmail());
        existing.setRole(employee.getRole());

        return repository.save(existing);
    }
}