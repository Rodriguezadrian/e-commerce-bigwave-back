const { Model, DataTypes } = require("sequelize");
const slugify = require("slugify");

class Category extends Model {
  static initModel(sequelize) {
    Category.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        slug: {
          type: DataTypes.STRING,
          unique: true,
        },
      },
      {
        sequelize,
        paranoid: true,
        modelName: "Category",
        hooks: {
          beforeBulkCreate: (categories) => {
            for (const category of categories) {
              console.log(category.name);
              if (category.name) {
                category.slug = slugify(category.name, {
                  lower: true,
                  strict: true,
                });
              }
            }
          },
          beforeCreate: (category) => {
            if (category.name) {
              category.slug = slugify(category.name, {
                lower: true,
                strict: true,
              });
            }
          },
          beforeUpdate: (category) => {
            if (category.changed("name")) {
              category.slug = slugify(category.name, {
                lower: true,
                strict: true,
              });
            }
          },
        },
      }
    );
    return Category;
  }
}

module.exports = Category;
