package fr.iut.blagnac.exceptions;

public class SAE5ManagementException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private SAE5ManagementExceptionTypes type;

    public SAE5ManagementException(SAE5ManagementExceptionTypes type) {
        super(type.getMessage());
        this.type = type;
    }

    public SAE5ManagementException(SAE5ManagementExceptionTypes type, String message) {
        super(message);
        this.type = type;
    }

    public SAE5ManagementException(SAE5ManagementExceptionTypes type, String message, Throwable cause) {
        super(message, cause);
        this.type = type;
    }

    public SAE5ManagementException(SAE5ManagementExceptionTypes type, Throwable cause) {
        super(type.getMessage(), cause);
        this.type = type;
    }

    public SAE5ManagementExceptionTypes getType() {
        return type;
    }

    public int getStatus() {
        return type.getStatus();
    }

}
