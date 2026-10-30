
package backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
  private final JwtService jwtService;

   public AuthController(
        AuthService authService,
        JwtService jwtService) {

    this.authService = authService;
    this.jwtService = jwtService;
}

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequest request) {

        try {
            String message = authService.register(request);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(message);

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
    
   

@PostMapping("/login")
public ResponseEntity<?> login(
        @Valid @RequestBody LoginRequest request) {

    try {
        User user = authService.login(
                request.getEmail(),
                request.getPassword());

        String token = jwtService.generateToken(user.getEmail());

        return ResponseEntity.ok(
                java.util.Map.of(
                        "message", "Login successful",
                        "name", user.getName(),
                        "email", user.getEmail(),
                        "token", token
                )
        );

    } catch (IllegalArgumentException e) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(java.util.Map.of(
                        "message", "Invalid email or password"
                ));
    }
}
}