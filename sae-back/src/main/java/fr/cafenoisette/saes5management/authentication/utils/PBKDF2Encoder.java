package fr.cafenoisette.saes5management.authentication.utils;

import fr.cafenoisette.saes5management.constants.AuthConstants;
import jakarta.enterprise.context.RequestScoped;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;

@RequestScoped
public class PBKDF2Encoder {

    private static final String secret = AuthConstants.SECRET;
    private static final Integer iteration = AuthConstants.ITERATION;
    private static final Integer keylength = AuthConstants.KEYLENGTH;

    /**
     * Encode a password using PBKDF2.
     * @param cs password
     * @return encoded password
     */
    public String encode(CharSequence cs) {
        try {
            byte[] result = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512")
                    .generateSecret(new PBEKeySpec(cs.toString().toCharArray(), secret.getBytes(), iteration, keylength))
                    .getEncoded();
            return Base64.getEncoder().encodeToString(result);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException ex) {
            throw new RuntimeException(ex);
        }
    }
}