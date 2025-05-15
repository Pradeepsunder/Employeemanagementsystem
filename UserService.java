package org.example.employee.service;

import org.example.employee.model.User;
import org.example.employee.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public void register(User user) {
        repository.save(user);
    }

    public boolean validateUser(String username, String password) {
        User user = repository.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }
}
