<script>
import BidService from "@/services/BidService";
export default {

  name: "BidManagement",  // Only changed this line
  data() {
    return {
      bids: [],
      filteredBids: [],
      searchQuery: "",
      searchedBid: null,
      showAddForm: false,
      creationSuccess: false,
      newBid: {
        auctionSessionId: null,
        bidAmount: null,
        bidDate: "",
        carVin: "",
        status: "Active",
        totalBids: 1,
        userId: null
      },
      showEditForm: false,
      editBid: {
        bidId: null,
        auctionSessionId: null,
        bidAmount: null,
        bidDate: "",
        carVin: "",
        status: "",
        totalBids: null,
        userId: null
      }
    };
  },
  methods: {
    getBids() {
      BidService.getBids()
          .then((response) => {
            this.bids = response.data;
            this.filteredBids = response.data;
          })
          .catch((err) => {
            console.error("Failed to fetch bids:", err);
            this.bids = [];
            this.filteredBids = [];
          });
    },
    searchBids() {
      const input = this.searchQuery.toString().trim();
      if (!input) {
        this.filteredBids = this.bids;
        return;
      }
      this.filteredBids = this.bids.filter((bid) =>
          bid.bidId.toString().includes(input) ||
          bid.carVin.toString().includes(input) ||
          bid.userId.toString().includes(input)
      );
    },
    clearSearch() {
      this.searchQuery = "";
      this.searchedBid = null;
      this.getBids();
    },
    submitBid() {
      BidService.createBid(this.newBid).then((response) => {
        console.log("Bid created:", response.data);
        this.creationSuccess = true;
        this.showAddForm = false;
        this.resetForm();
        this.getBids();
      })
      .catch((error) => {
        console.error("Error creating bid:", error);
        this.creationSuccess = false;
      });
    },
    resetForm() {
      this.newBid = {
        auctionSessionId: null,
        bidAmount: null,
        bidDate: "",
        carVin: "",
        status: "Active",
        totalBids: 1,
        userId: null
      };
    },
    openEditForm(bid) {
      this.editBid = { ...bid };
      this.showEditForm = true;
    },
    submitEditBid() {
      BidService.updateBid(this.editBid)
          .then((res) => {
            console.log("Bid updated:", res.data);
            this.showEditForm = false;
            this.getBids();
          })
          .catch((err) => {
            console.error("Error updating bid:", err);
          });
    },
    formatCurrency(amount) {
      return amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  },
  created() {
    this.getBids();
  },
};
</script>

<template>
  <div class="container">
    <h1 class="text-center mt-4">Bid Management</h1>

    <div class="mb-4">
      <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search by Bid ID, VIN, or User ID"
          aria-label="Search Bids"
          @input="searchBids"
      />
      <button @click="searchBids" class="btn search-btn mt-2">Search</button>
      <button v-if="searchQuery" @click="clearSearch" class="btn btn-secondary mt-2 ml-2">Clear</button>
    </div>

    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card add-bid-card" @click="showAddForm = true">
          <div class="card-body text-center">
            <h5 class="card-title">+ Add Bid</h5>
            <p class="card-text">Click to create a new bid</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="filteredBids.length > 0" class="row">
      <div class="col-md-6" v-for="bid in filteredBids" :key="bid.bidId">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Bid #{{ bid.bidId }}</h5>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Auction Session:</span>
              <span>{{ bid.auctionSessionId }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Amount:</span>
              <span>${{ formatCurrency(bid.bidAmount) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Date:</span>
              <span>{{ formatDate(bid.bidDate) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">VIN:</span>
              <span>{{ bid.carVin }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">User ID:</span>
              <span>{{ bid.userId }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span class="text-muted">Status:</span>
              <span :class="`bid-status status-${bid.status.toLowerCase()}`">{{ bid.status }}</span>
            </div>

            <button class="edit-btn" @click="openEditForm(bid)">Edit</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAddForm" class="modal-overlay" @click.self="showAddForm = false">
      <div class="modal-content">
        <h5 class="modal-title mb-3">Create New Bid</h5>
        <form @submit.prevent="submitBid">
          <div class="form-group">
            <label>Auction Session ID</label>
            <input v-model.number="newBid.auctionSessionId" type="number" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Bid Amount</label>
            <input v-model.number="newBid.bidAmount" type="number" step="0.01" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Bid Date</label>
            <input v-model="newBid.bidDate" type="datetime-local" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Car VIN</label>
            <input v-model="newBid.carVin" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="newBid.status" class="form-control" required>
              <option value="Active">Active</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div class="form-group">
            <label>Total Bids</label>
            <input v-model.number="newBid.totalBids" type="number" class="form-control" required />
          </div>
          <div class="form-group">
            <label>User ID</label>
            <input v-model.number="newBid.userId" type="number" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-success">Create</button>
          <button type="button" class="btn btn-secondary ml-2" @click="showAddForm = false">Cancel</button>
        </form>
      </div>
    </div>

    <div v-if="showEditForm" class="modal-overlay" @click.self="showEditForm = false">
      <div class="modal-content">
        <h5 class="modal-title mb-3">Edit Bid</h5>
        <form @submit.prevent="submitEditBid">
          <div class="form-group">
            <label>Auction Session ID</label>
            <input v-model.number="editBid.auctionSessionId" type="number" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Bid Amount</label>
            <input v-model.number="editBid.bidAmount" type="number" step="0.01" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Bid Date</label>
            <input v-model="editBid.bidDate" type="datetime-local" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Car VIN</label>
            <input v-model="editBid.carVin" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="editBid.status" class="form-control" required>
              <option value="Active">Active</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div class="form-group">
            <label>Total Bids</label>
            <input v-model.number="editBid.totalBids" type="number" class="form-control" required />
          </div>
          <div class="form-group">
            <label>User ID</label>
            <input v-model.number="editBid.userId" type="number" class="form-control" required />
          </div>

          <button type="submit" class="btn btn-success">Save Changes</button>
          <button type="button" class="btn btn-secondary ml-2" @click="showEditForm = false">Cancel</button>
        </form>
      </div>
    </div>

    <div v-if="searchQuery && filteredBids.length === 0" class="alert alert-warning">
      No bids found with that criteria.
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

.add-bid-card {
  background-color: rgba(185, 153, 118, 0.1);
  border: 2px dashed #b99976;
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.add-bid-card:hover {
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
  color: #b99976;
  background: rgba(30, 30, 30, 0.85);
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
.search-btn {
  background-color: #b99976;
  color: #1c1c1c;
  border: none;
  padding: 6px 14px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background-color: #d4b783;
}

.text-center {
  text-align: center;
}

.text-success {
  color: #4caf50;
  font-weight: 600;
}

.bid-status {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-active {
  background-color: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.status-won {
  background-color: rgba(185, 153, 118, 0.2);
  color: #b99976;
}

.status-lost {
  background-color: rgba(255, 90, 95, 0.2);
  color: #ff5a5f;
}

.status-pending {
  background-color: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}
</style>