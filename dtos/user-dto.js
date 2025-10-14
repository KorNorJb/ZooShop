class UserDTO {
    constructor(model) {
        if (!model) {
            throw new Error("Model is required to create UserDTO");
        }
        this.email = model.email;
        this.id = model._id;
        this.isactivated = model.isactivated;
    }
}

export default UserDTO;