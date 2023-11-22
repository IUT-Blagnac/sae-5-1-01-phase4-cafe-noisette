package fr.iut.blagnac.authentication.utils;

import jakarta.ws.rs.core.SecurityContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PermissionChecker {

    private static final Logger LOGGER = LoggerFactory.getLogger(PermissionChecker.class);

    public static boolean checkUsername(SecurityContext securityContext, String username, boolean adminBypass) {
        try {
            if (adminBypass && securityContext.isUserInRole("ADMIN")) {
                return true;
            }
            LOGGER.info("Checking permission for user " + securityContext.getUserPrincipal().getName() + " and username " + username);
            return securityContext.getUserPrincipal().getName().equals(username);
        } catch (Exception e) {
            LOGGER.error("Error while checking permission", e);
            return false;
        }
    }

}
