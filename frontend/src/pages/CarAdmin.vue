<!-- 
author: Esihle Mlinjana
student: 222441712 
-->

<template>
  <div class="car-management">
    <h1>Car Management</h1>

    <!-- Add New Car Form -->
    <div class="add-car-form">
      <h2>Add New Car</h2>
      <input v-model="newCar.carVIN" placeholder="VIN" />
      <input v-model="newCar.carMake" placeholder="Make" />
      <input v-model="newCar.carModel" placeholder="Model" />
      <input v-model="newCar.carYear" type="number" placeholder="Year" />
      <input v-model="newCar.carMileage" type="number" placeholder="Mileage" />
      <input v-model="newCar.auctionEndTime" placeholder="Auction End Time (YYYY-MM-DDTHH:MM:SS)" />
      <input type="file" @change="handleImageUpload($event, 'new')" />
      <button @click="addCar">Add Car</button>
    </div>

    <h2>Cars in Auction</h2>
    <table v-if="cars.length">
      <thead>
        <tr>
          <th>VIN</th>
          <th>Make</th>
          <th>Model</th>
          <th>Year</th>
          <th>Mileage</th>
          <th>Status</th>
          <th>Auction End</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="car in cars" :key="car.carVIN">
          <td>{{ car.carVIN }}</td>
          <td>{{ car.carMake }}</td>
          <td>{{ car.carModel }}</td>
          <td>{{ car.carYear }}</td>
          <td>{{ car.carMileage }}</td>
          <td>{{ car.carStatus }}</td>
          <td>{{ car.auctionEndTime }}</td>
          <td>
            <img v-if="car.mediaBase64" :src="car.mediaBase64" alt="car image" width="80" />
          </td>
          <td>
            <button @click="editCarForm(car)">Edit</button>
            <button @click="deleteCarConfirm(car)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No cars found.</p>

    <!-- Edit Car Modal -->
    <div v-if="editCar.carVIN" class="edit-car-modal">
      <h2>Edit Car: {{ editCar.carVIN }}</h2>
      <input v-model="editCar.carMake" placeholder="Make" />
      <input v-model="editCar.carModel" placeholder="Model" />
      <input v-model="editCar.carYear" type="number" placeholder="Year" />
      <input v-model="editCar.carMileage" type="number" placeholder="Mileage" />
      <input v-model="editCar.carStatus" placeholder="Status" />
      <input v-model="editCar.auctionEndTime" placeholder="Auction End Time" />
      <input type="file" @change="handleImageUpload($event, 'edit')" />
      <button @click="updateCar">Save</button>
      <button @click="editCar = {}">Cancel</button>
    </div>

    <!-- Delete Confirmation -->
    <div v-if="deleteCar" class="delete-confirmation">
      <p>Are you sure you want to delete {{ deleteCar.carVIN }}?</p>
      <button @click="deleteCarNow">Yes</button>
      <button @click="deleteCar = null">No</button>
    </div>
  </div>
</template>

<script>
import CarAdminService from "@/services/CarAdminService";

export default {
  name: "CarAdmin",
  data() {
    return {
      cars: [],
      newCar: {
        carVIN: "",
        carMake: "",
        carModel: "",
        carYear: "",
        carMileage: "",
        carStatus: "AVAILABLE",
        auctionEndTime: "",
        image: null,
      },
      editCar: {},
      deleteCar: null,
    };
  },
  created() {
    this.getCars();
  },
  methods: {
    getCars() {
      CarAdminService.getAllCars()
        .then((res) => {
          this.cars = res.data;
        })
        .catch((err) => console.error(err));
    },

    handleImageUpload(event, type) {
      const file = event.target.files[0];
      if (type === "new") this.newCar.image = file;
      else if (type === "edit") this.editCar.image = file;
    },

    addCar() {
      CarAdminService.createCar(this.newCar)
        .then(() => {
          this.getCars();
          this.resetNewCar();
        })
        .catch((err) => console.error(err));
    },

    resetNewCar() {
      this.newCar = {
        carVIN: "",
        carMake: "",
        carModel: "",
        carYear: "",
        carMileage: "",
        carStatus: "AVAILABLE",
        auctionEndTime: "",
        image: null,
      };
    },

    editCarForm(car) {
      this.editCar = { ...car, image: null };
    },

    updateCar() {
      CarAdminService.updateCar(this.editCar)
        .then(() => this.getCars())
        .catch((err) => console.error(err));
    },

    deleteCarConfirm(car) {
      this.deleteCar = car;
    },

    deleteCarNow() {
      CarAdminService.deleteCar(this.deleteCar.carVIN)
        .then(() => {
          this.getCars();
          this.deleteCar = null;
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style scoped>
.car-management {
  padding: 40px 60px;
  font-family: 'Bodoni Moda SC', serif;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.85);
  min-height: 100vh;
}

.add-car-form, .edit-car-modal, .delete-confirmation {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #b99976;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.add-car-form input, 
.edit-car-modal input, 
.delete-confirmation input,
.add-car-form select, 
.edit-car-modal select {
  width: 100%;
  padding: 10px 15px;
  margin-top: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
}

.add-car-form button, 
.edit-car-modal button, 
.delete-confirmation button {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.add-car-form button {
  background-color: #b99976;
  color: #000;
}

.add-car-form button:hover {
  background-color: #9d7b5a;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 25px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

th, td {
  padding: 12px 15px;
  border-bottom: 1px solid #444;
  text-align: left;
  font-size: 0.9rem;
  color: #ffffff;
}

th {
  background-color: rgba(185, 153, 118, 0.8);
  font-weight: 600;
}

tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.05);
}

tr:hover {
  background-color: rgba(185, 153, 118, 0.2);
}

img {
  border-radius: 10px;
  max-width: 120px;
  height: auto;
  box-shadow: 0 2px 8px rgba(0,0,0,0.5);
}

.status {
  font-size: 0.8rem;
  color: #b99976;
  font-weight: 500;
}

.bid {
  font-size: 0.9rem;
  color: #ffffff;
}

.car-actions button {
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.car-actions .edit-btn {
  background-color: #b99976;
  color: #000;
}

.car-actions .edit-btn:hover {
  background-color: #9d7b5a;
}

.car-actions .delete-btn {
  background-color: #ff5a5f;
  color: #fff;
}

.car-actions .delete-btn:hover {
  background-color: #d4484c;
}

</style>
