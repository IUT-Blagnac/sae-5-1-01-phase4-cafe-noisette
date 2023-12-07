package fr.cafenoisette.saes5management;

import fr.cafenoisette.saes5management.users.dtos.UserDTO;
import fr.cafenoisette.saes5management.users.services.UserService;
import io.quarkus.runtime.Startup;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@RegisterForReflection
public class OnQuarkusStart {

    @Inject
    UserService userService;

    @ConfigProperty(name = "fr.cafenoisette.saes5management.admin.username")
    String adminUsername;

    @ConfigProperty(name = "fr.cafenoisette.saes5management.admin.password")
    String adminPassword;

    @Startup
    public void onStart() {
        UserDTO admin = new UserDTO();
        admin.setUsername(adminUsername);
        admin.setPassword(adminPassword);

        userService.createFirstAdminUser(admin);
    }

}
