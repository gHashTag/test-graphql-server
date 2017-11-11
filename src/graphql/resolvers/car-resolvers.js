import Car from '../../models/Car'
import User from '../../models/User'

export default {
  getCar: (_, { _id }) => Car.findById(_id),
  getCars: () => Car.find({}),

  createCar: async (_, args) => {
    console.log('args', args)
    // Create new car
    //const newCar = new Car(args)
    const newCar = await Car.create(args) 
    console.log('newCar', newCar._id)

    // Get user
    const user = await User.findById(args._id)
    //console.log('user', user)
    
    // Assign user as a car's seller
    newCar.seller = user
    // Save the car
    await newCar.save()
    // Add car to the user's selling array 'cars'
    user.cars.push(newCar)
    // Save the user
    await user.save()
  }
}
