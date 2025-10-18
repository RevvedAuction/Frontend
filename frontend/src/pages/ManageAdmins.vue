<script>
import AdminService from "@/services/AdminService";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Admins",
  data() {
    return {
      admins: [],
      filteredAdmins: [],
      searchNumber: "",
      searchedAdmin: null,
      showAddForm: false,
      creationSuccess: false,
      newAdmin: {
        adminNumber: null,
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        dateCreated: "",
      },
      showEditForm: false,
      editAdmin: {
        adminId: null,
        adminNumber: null,
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
      },
      showDeleteConfirm: false,
      deleteAdmin: null,
    };
  },
  methods: {
    getAdmins() {
      AdminService.getAdmins()
          .then((response) => {
            this.admins = response.data;
            this.filteredAdmins = response.data;
          })
          .catch((err) => {
            console.error("Failed to fetch admins:", err);
            this.admins = [];
            this.filteredAdmins = [];
          });
    },
    searchAdmin() {
      const input = this.searchNumber.toString().trim();
      if (!input) {
        this.filteredAdmins = this.admins;
        return;
      }
      this.filteredAdmins = this.admins.filter((admin) =>
          admin.adminNumber.toString().startsWith(input)
      );
    },
    clearSearch() {
      this.searchNumber = "";
      this.searchedAdmin = null;
      this.getAdmins();
    },
    submitAdmin() {
      AdminService.createAdmin(this.newAdmin).then((response) => {
        console.log("Admin created:", response.data);
        this.creationSuccess = true;
        this.showAddForm = false;
        this.resetForm();
        this.getAdmins();
      })
      .catch((error) => {
        console.error("Error creating admin:", error);
        this.creationSuccess = false;
      });
    },
    resetForm() {
      this.newAdmin = {
        adminNumber: null,
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        dateCreated: "",
      };
    },
    openEditForm(admin) {
      this.editAdmin = { ...admin };
      this.showEditForm = true;
    },
    submitEditAdmin() {
      AdminService.updateAdmin(this.editAdmin)
          .then((res) => {
            console.log("Admin updated:", res.data);
            this.showEditForm = false;
            this.getAdmins();
          })
          .catch((err) => {
            console.error("Error updating admin:", err);
          });
    },
    confirmDelete(admin) {
      this.deleteAdmin = admin;
      this.showDeleteConfirm = true;
    },
    cancelDelete() {
      this.deleteAdmin = null;
      this.showDeleteConfirm = false;
    },
    confirmDeleteAdmin() {
      AdminService.deleteAdmin(this.deleteAdmin.adminNumber).then(() => {
          this.showDeleteConfirm = false;
          this.deleteAdmin = null;
          this.getAdmins();
        })
        .catch(error => {
          alert('Failed to delete admin: ' + error.message);
      });
    },
  },
  created() {
    this.getAdmins();
  },
};
</script>

<template>
  <div class="container">
    <h1 class="text-center mt-4">Admin Management</h1>

    <div class="mb-4">
      <input
          v-model="searchNumber"
          type="number"
          class="form-control"
          placeholder="Enter Admin Number"
          aria-label="Admin Number"
          @input="searchAdmin"
      />
      <button @click="searchAdmin" class="btn search-btn mt-2">Search</button>
      <button v-if="searchNumber" @click="clearSearch" class="btn btn-secondary mt-2 ml-2">Clear</button>
    </div>

    <div v-if="searchedAdmin" class="row">
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">{{ searchedAdmin.fullName }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Admin Number: {{ searchedAdmin.adminNumber }}</h6>
            <p class="card-text">Email: {{ searchedAdmin.email }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card add-admin-card" @click="showAddForm = true">
          <div class="card-body text-center">
            <h5 class="card-title">+ Add Admin</h5>
            <p class="card-text">Click to register a new admin</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredAdmins.length > 0" class="row">
      <div class="col-md-4" v-for="admin in filteredAdmins" :key="admin.adminId">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">{{ admin.fullName }}</h5>
            <h6 class="card-subtitle mb-2">{{ admin.email }}</h6>

            <button class="edit-btn" @click="openEditForm(admin)">Edit</button>
            <button class="delete-btn ml-2" @click="confirmDelete(admin)">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAddForm" class="modal-overlay" @click.self="showAddForm = false">
      <div class="modal-content">
        <h5 class="modal-title mb-3">Create New Admin</h5>
        <form @submit.prevent="submitAdmin">
          <div class="form-group">
            <label>Admin Number</label>
            <input v-model.number="newAdmin.adminNumber" type="number" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Full Name</label>
            <input v-model="newAdmin.fullName" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="newAdmin.email" type="email" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="newAdmin.password" type="password" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input v-model="newAdmin.phoneNumber" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Date Created</label>
            <input v-model="newAdmin.dateCreated" type="date" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-success">Create</button>
          <button type="button" class="btn btn-secondary ml-2" @click="showAddForm = false">Cancel</button>
        </form>
      </div>
    </div>

    <div v-if="showEditForm" class="modal-overlay" @click.self="showEditForm = false">
      <div class="modal-content">
        <h5 class="modal-title mb-3">Edit Admin</h5>
        <form @submit.prevent="submitEditAdmin">
          <div class="form-group">
            <label>Admin Number</label>
            <input v-model.number="editAdmin.adminNumber" type="number" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Full Name</label>
            <input v-model="editAdmin.fullName" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="editAdmin.email" type="email" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="editAdmin.password" type="password" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input v-model="editAdmin.phoneNumber" type="text" class="form-control" required />
          </div>

          <button type="submit" class="btn btn-success">Save Changes</button>
          <button type="button" class="btn btn-secondary ml-2" @click="showEditForm = false">Cancel</button>
        </form>
      </div>
    </div>

    <div class="modal" tabindex="-1" role="dialog" v-if="showDeleteConfirm">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Delete</h5>
            <button type="button" class="close" @click="cancelDelete" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete admin <strong>{{ deleteAdmin.fullName }} : ID {{ deleteAdmin.adminNumber }}</strong>?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cancelDelete">Cancel</button>
            <button type="button" class="btn btn-danger" @click="confirmDeleteAdmin">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="searchNumber && !searchedAdmin" class="alert alert-warning">
      No admin found with that number.
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda+SC:wght@400;700&family=Playfair+Display:wght@400;700&display=swap');

.container {
  padding: 2rem 3rem;
  font-family: 'Arial', Helvetica, sans-serif;
  color: #ffffff;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.85);
}

h1 {
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Bodoni Moda SC', serif;
  color: #b99976;
  font-size: 2.5rem;
}

.add-admin-card {
  background-color: rgba(185, 153, 118, 0.1);
  border: 2px dashed #b99976;
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.add-admin-card:hover {
  background-color: rgba(185, 153, 118, 0.2);
  box-shadow: 0 6px 15px rgba(185, 153, 118, 0.5);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: rgba(30,30,30,0.9);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 15px;
  width: 600px;
  max-width: 90%;
  box-shadow: 0 12px 30px rgba(0,0,0,0.6);
  color: #ffffff;
  font-family: 'Arial', Helvetica, sans-serif;
}

.card {
  color: #b99976; /* golden text */
  background: rgba(30, 30, 30, 0.85); /* dark card background */
  border: 1px solid rgba(185,153,118,0.5);
  border-radius: 12px;
  margin-bottom: 1rem;
  padding: 1rem 1.5rem;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.card:hover {
  box-shadow: 0 6px 15px rgba(185,153,118,0.5);
  transform: translateY(-3px);
}

.card button {
  padding: 6px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: 'Arial', Helvetica, sans-serif;
}
.card .edit-btn {
  background-color: #b99976;
  color: #1c1c1c;
}
.card .delete-btn {
  background-color: #a63a3a; /* muted deep red */
  color: #ffffff;
}
.card .delete-btn:hover {
  background-color: #c14c4c;
}
.search-btn {
  background-color: #b99976; /* golden */
  color: #1c1c1c; /* dark text for contrast */
  border: none;
  padding: 6px 14px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background-color: #d4b783; /* lighter golden on hover */
}

.text-center {
  text-align: center;
}

.text-success {
  color: #4caf50; /* green */
  font-weight: 600;
}

.text-danger {
  color: #ff5a5f; /* red */
  font-weight: 600;
}

</style>