
package backend;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public String register(RegisterRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException(
                "Email is already registered"
            );                  
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(email);

        // Store a BCrypt hash, never the plain password
        user.setPassword(
            passwordEncoder.encode(request.getPassword())
        );

        userRepository.save(user);

        return "Registration successful";
    }

public User login(String email, String password) {
    User user = userRepository
            .findByEmail(email.trim().toLowerCase())
            .orElseThrow(() ->
                    new IllegalArgumentException(
                            "Invalid email or password"));

    if (!passwordEncoder.matches(password, user.getPassword())) {
        throw new IllegalArgumentException(
                "Invalid email or password");
    }

    return user;
}
    
@Transactional
public void changePassword(
        String email,
        String currentPassword,
        String newPassword) {

    User user = userRepository
            .findByEmail(email.trim().toLowerCase())
            .orElseThrow(() ->
                    new IllegalArgumentException("User not found"));

    if (!passwordEncoder.matches(
            currentPassword, user.getPassword())) {
        throw new IllegalArgumentException(
                "Current password is incorrect");
    }

    if (newPassword == null || newPassword.length() < 8) {
        throw new IllegalArgumentException(
                "New password must be at least 8 characters");
    }

    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);
}

}

