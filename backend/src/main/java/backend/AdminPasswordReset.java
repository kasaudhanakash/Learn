
package backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@ConditionalOnProperty(
    name = "app.admin-reset.enabled",
    havingValue = "true"
)
public class AdminPasswordReset {

    @Bean
    CommandLineRunner resetAdminPassword(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            @Value("${ADMIN_RESET_EMAIL}") String email,
            @Value("${ADMIN_RESET_PASSWORD}") String password) {

        return args -> userRepository.findByEmail(email)
            .ifPresentOrElse(user -> {
                user.setPassword(passwordEncoder.encode(password));
              
                userRepository.save(user);
                System.out.println("Admin password reset successful");
            }, () -> System.out.println("Admin account not found"));
    }
}
