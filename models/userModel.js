const {sql} =require("../config/db");

const findUserByEmail=async (email)=>{
    const result = await sql.query`Select * from Users where Email=${email}`;

    return result.recordset[0];
};

const createUser=async (userData)=>{
    const {fullName,email,passwordHash,phone}=userData;

    await sql.query`Insert into Users (
    FullName,
    Email,
    PasswordHash,
    Phone
    )
    values(
    ${fullName},
    ${email},
    ${passwordHash},
    ${phone}
    )
    `;
};

const getUserById = async (userId) => {
    const result =await sql.query`
     SELECT
            UserId,
            FullName,
            Email,
            Phone,
            Role,
            IsActive,
            CreatedAt
        FROM Users where UserId=${userId}`;

    return result.recordset[0];
}

module.exports = {
    findUserByEmail,
    createUser,
    getUserById
}