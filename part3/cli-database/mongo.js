const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Not enough parameters, at least must enter password');
	process.exit(1)
}

const [password, name, number] = process.argv.slice(2)

const url = `mongodb+srv://rodrigoolmospercoco:${password}@cluster0.2ibkelo.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})
const Person = mongoose.model('Person', personSchema)

const main = async () => {
	try {
		await mongoose.connect(url);
		console.log('Connected to MongoDB');
		if (name && number) {
			const newPerson = new Person({ name, number });
			await newPerson.save();
			console.log(`Added ${name} with number ${number} to phonebook`);
		} else {
			const people = await Person.find({});
			people.forEach(person => console.log(person));
		}
	} catch (error) {
		console.error('Error:', error.message);
	} finally {
		await mongoose.connection.close();
	}
}

main();

