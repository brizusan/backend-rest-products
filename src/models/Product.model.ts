import {Table , Column , Model , DataType, Default} from "sequelize-typescript"

@Table({
  tableName: "products",
  timestamps: false
})

class Product extends Model{
  
  @Column({
    type: DataType.STRING,
  })
  declare name: string  

  @Column({
    type:DataType.FLOAT(6,2),
  })
  price!:number

  @Default(true)
  @Column({
    type:DataType.BOOLEAN,
  })
  availability!:boolean

}

export default Product
