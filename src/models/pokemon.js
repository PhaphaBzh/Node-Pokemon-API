const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: {
            //     arg: true,
            //     msg: 'Le nom est déjà pris.'
            // },
            unique: true,
            validate: {
                notEmpty: { msg: 'Le champ Nom ne doit pas être vide.' },
                notNull: { msg: 'Le champ Nom est une propriété requise.' }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
                notNull: { msg: 'Les points de vie sont une propriété requise.' },
                min: {
                    args: [0],
                    msg: "Les points de vie doivent être supérieurs à 0."
                },
                max: {
                    args: [999],
                    msg: "Les points de vie ne peuvent dépasser 999."
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de dégâts.' },
                notNull: { msg: 'Les points de dégâts sont une propriété requise.' },
                min: {
                    args: [0],
                    msg: "Les points de dégâts doivent être supérieurs à 0."
                },
                max: {
                    args: [99],
                    msg: "Les points de dégâts ne peuvent dépasser 99."
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: { msg: "Merci d'entrer un format d'Url valide." },
                notNull: { msg: "L'Url est une propriété requise." }
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                //création d'un validator personnalisé
                isTypesValid(value) {
                    if (!value) {
                        throw new Error("Un pokémon doit avoir au moins un type")
                    }
                    if (value.split(',').length > 3) {
                        throw new Error("Un pokémon ne doit pas avoir plus de trois types")
                    }
                    value.split(',').forEach(type => {
                        if (!validTypes.includes(type)) {
                            throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
                        }
                    })
                }
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created', //on a changé le nom de la propriété createAt en created
        updatedAt: false // on refuse la sauvegarde automatique updateAt proposé par sequelize
    })
}