const connection = require('../config/db-connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const mySecretPass = 'mysecreetpassword';

let User = {};

User.register = ( user, cb ) => {
    if ( connection ) {
        connection.beginTransaction( error  => {
            if ( error ) return cb( cb );
            // Hash password
            bcrypt.hash(user.password, saltRounds)
            .then( hash => {
                user.password = hash;
                // Insert into table
                connection.query('INSERT INTO user SET ?', [user], ( error, results, fileds ) => {
                    if ( error )
                        return connection.rollback( () => cb ( error ));
                        
                        connection.commit( error => {
                            if ( error )
                                return connection.rollback( () => cb( error ))
                        });
                        console.log('Success!');
                        return cb( null, results );
                })
            })
            .catch( error => {
                return connection.rollback( () => cb ( error ));
            })
            
        })
    } else 
        return cb ('Connection refused');
}

User.login = ( email, password, cb ) => {
    if ( connection ) {
        connection.query(`
            SELECT user_id, password FROM user WHERE email = ?`, [email], (error, results, fields) => {
            if ( error )
                return cb ( error );
            if ( results[0] ) {
                const hash = results[0].password.toString();
                bcrypt.compare(password, hash, ( error, res ) => {
                    if ( res ) {
                        const user = {
                            email: results[0].email,
                            password: password
                        }
                        const token = jwt.sign(user, mySecretPass, {
                            expiresIn: 4000
                        });
                        return cb( null, { 
                            sucess: true,
                            message: 'Successfully logged',
                            token: token 
                        });

                    } else 
                        return cb ( {
                            success: false,
                            message: 'Incorrect password'
                        } );
                    
                });
            } else {
                return cb( {
                    success: false,
                    message: 'Email and password does not match'
                })
            }

        });
    } else 
        return cb ('Connection refused');
}


User.response = (res, error, data) => {
    if (error) 
        res.status(500).json(error);
    else
        res.status(200).json(data);
}
  
module.exports = User;