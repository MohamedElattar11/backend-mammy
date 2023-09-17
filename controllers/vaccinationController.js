const Vaccination = require("../Models/vaccination");
const User = require("../Models/Users");
const moment = require("moment");

exports.getVaccineById = async (req, res) => {
  const { vaccinationId } = req.params;

  const vaccine = await Vaccination.findById(vaccinationId);
  console.log(vaccine);
  res.send({ data: vaccine });
};
exports.getAllVaccines = async (req, res) => {
  const vaccines = await Vaccination.find();
  res.send(vaccines);
};

//new vaccination and push this to all mothers have babies
// exports.createVaccination = async (req, res) => {
//   try {
//     const { name, date, min, max, delete_time } = req.body;

//     // Save the vaccine in  vaccination schema

//       // Find all users with the role 'mother'
//       const users = await User.find({ role: 'mother' });

//       if (users.length === 0) {
//         return res.status(404).json({ error: 'No users with the role "mother" found' });
//       }

//       // Iterate through each user and add the new vaccination to their baby profiles
//       for (const user of users) {
//         // Check if the user has any baby information
//         if (!user.profile.babyInfo || user.profile.babyInfo.length === 0) {
//           continue; // Skip this user and move to the next one
//         }

//         // Iterate through each baby info and add the new vaccination
//         for (const babyInfo of user.profile.babyInfo) {
//           // Check if the age of the vaccination is less than the baby's age
//           if (babyInfo.age < max) {
//             // Create a new vaccination object
//             const newVaccination = new Vaccination({
//               name,
//               date,
//               min,
//               max,
//               delete_time
//             });

//             // Add the new vaccination to the baby's profile
//             babyInfo.vaccination.push(newVaccination);

//           }          // Save the updated user object
//           await user.save();

//         }
//         res.status(201).json({ message: 'Vaccination added to all babies of users with the role "mother"', status: 201 });
//       }
//     } catch (error) {
//     console.error('Error creating vaccination:', error);
//     res.status(500).json({ error: 'Internal error' });
//   }
// };

//new controller to save in schema

exports.createVaccination = async (req, res) => {
  try {
    const { name, date, min, max, delete_time } = req.body;

    // Save the vaccine in the vaccination schema
    const vaccination = new Vaccination({
      name,
      date,
      min,
      max,
      delete_time,
    });

    // Save the vaccination object
    await vaccination.save();

    // Find all users with the role 'mother'
    const users = await User.find({ role: "mother" });

    if (users.length === 0) {
      return res
        .status(404)
        .json({ error: 'No users with the role "mother" found' });
    }

    // Iterate through each user and add the new vaccination to their baby profiles
    for (const user of users) {
      // Check if the user has any baby information
      if (!user.profile.babyInfo || user.profile.babyInfo.length === 0) {
        continue; // Skip this user and move to the next one
      }

      // Iterate through each baby info and add the new vaccination
      for (const babyInfo of user.babyInfo) {
        // Check if the age of the vaccination is less than the baby's age
        if (babyInfo.age < max) {
          // Create a new vaccination object
          const newVaccination = {
            name,
            date,
            min,
            max,
            delete_time,
          };

          // Add the new vaccination to the baby's profile
          babyInfo.vaccination.push(newVaccination);
        }
      }

      // Save the updated user object
      await user.save();
    }

    res.status(201).json({
      message:
        'Vaccination added to all babies of users with the role "mother"',
      status: 201,
    });
  } catch (error) {
    console.error("Error creating vaccination:", error);
    res.status(500).json({ error: "Internal error" });
  }
};

//------------------------------------------------------------------------------

exports.updateVaccination = async (req, res) => {
  try {
    const { vaccinationId } = req.params;
    const { name, min, max, delete_time } = req.body;

    const updatedVaccination = await Vaccination.findOneAndUpdate(
      { _id: vaccinationId },
      { name, min, max, delete_time }
    );
    console.log();

    if (!updatedVaccination) {
      return res.status(404).json({ error: "Vaccination not found" });
    }

    res.status(200).json(updatedVaccination);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

function claculateAge(date) {
  let currentDate = moment();
  let birthDate = moment(date, "YYYY-MM-DD");

  let age = currentDate.diff(birthDate, "months");
  return age;
}

exports.getVaccinationsForBaby = async (req, res) => {
  try {
    const { userId, babyId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const babyInfo = user.babyInfo.find((obj) => obj._id.toString() === babyId);
    if (!babyInfo) {
      res.status(404).json({ message: "Baby not found" });
      return;
    }

    const formatDate = moment(babyInfo.birthDate).format("YYYY-MM-DD");
    const age = claculateAge(formatDate);

    const vaccines = await Vaccination.find({});
    //Looping on all vaccinations and check if suitable for the baby or not then add it to his list if suitable
    for (const value of vaccines) {
      if (babyInfo.vaccination.length === 0 && value.age === age) {
        babyInfo.vaccination.push(value);
      } else if (
        value.age === age &&
        !babyInfo.vaccination.some((vac) => vac.name === value.name)
      )
        babyInfo.vaccination.push(value);
    }
    console.log("success");
    user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.updateVaccineForBaby = async (req, res) => {
  try {
    const { userId, babyId } = req.params;
    const { vacId } = req.body;

    console.log(vacId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const babyInfo = user.babyInfo.find((obj) => obj._id.toString() === babyId);

    if (!babyInfo) {
      return res.status(404).json({ message: "Baby not found" });
    }

    const vaccine = babyInfo.vaccination.find(
      (obj) => obj._id.toString() === vacId
    );

    if (!vaccine) {
      return res.status(404).json({ message: "Vaccine not found" });
    }

    console.log(vaccine.status);
    vaccine.status = true;
    babyInfo.markModified('vaccination');
    await user.save();
    console.log(vaccine.status);

    return res.status(201).json({ message: "Vaccine updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteVaccination = async (req, res) => {
  try {
    const vaccinationId = req.params.vaccinationId;

    const deletedVaccination = await Vaccination.findByIdAndDelete(
      vaccinationId
    );

    if (!deletedVaccination) {
      return res.status(404).json({ error: "Vaccination not found" });
    }

    res.status(200).json({ message: "Vaccination deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
