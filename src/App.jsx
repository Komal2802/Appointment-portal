import { useRef, useState } from "react";
import { useEffect } from "react";
import "./style.css";

function App() {
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments =
      localStorage.getItem("appointments");
    return savedAppointments
      ? JSON.parse(savedAppointments)
      : [];
  });

  const [formData, setFormData] = useState({
    patientName: "",
    doctor: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.patientName ||
      !formData.doctor ||
      !formData.date ||
      !formData.time
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editIndex !== null) {
      const updatedAppointments = [...appointments];
      updatedAppointments[editIndex] = formData;
      setAppointments(updatedAppointments);
      setEditIndex(null);
      alert("Appointment updated successfully!");
    } else {
      setAppointments([...appointments, formData]);
      alert("Appointment booked successfully!");
    }
    setFormData({
      patientName: "",
      doctor: "",
      date: "",
      time: "",
    });
  };

  const deleteAppointment = (indexToDelete) => {
    const updatedAppointments = appointments.filter(
      (_, index) => index !== indexToDelete
    );

    setAppointments(updatedAppointments);
  };

  const formRef = useRef(null);
  const handleBookDoctor = (doctorName) => {
    setFormData({
      ...formData,
      doctor: doctorName,
    });

    formRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToForm = () => {
    formRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    localStorage.setItem(
      "appointments",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  const [editIndex, setEditIndex] = useState(null);
  const handleEditAppointment = (appointment, index) => {
    setFormData(appointment);
    setEditIndex(index);
    formRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <header>
        <nav>
          <h1>Appointment Portal</h1>
          <ul>
            <li>Home</li>
            <li>Doctors</li>
            <li>Book Appointment</li>
            <li>Appointment</li>
          </ul>
        </nav>
      </header>

      <section className="hero-section">
        <h2>Book Doctor Appointments Easily</h2>
        <p>
          Manage and schedule appointments with doctors online.
        </p>
        <button onClick={scrollToForm}>Book Now</button>
      </section>

      <section className="doctor's-section">
        <h2>Available Doctors</h2>
        <div>
          <div>
            <h3>Dr. John Doe</h3>
            <p>Cardiologist</p>
            <p>Consultation Fee: ₹500</p>
            <button
              onClick={() =>
                handleBookDoctor("Dr. John Doe")
              }
            >
              Book Appointment
            </button>
          </div>

          <div>
            <h3>Dr. Sarah Smith</h3>
            <p>Dentist</p>
            <p>Consultation Fee: ₹300</p>
            <button
              onClick={() =>
                handleBookDoctor("Dr. Sarah Smith")
              }
            >
              Book Appointment
            </button>
          </div>

          <div>
            <h3>Dr. Alka Makhwana</h3>
            <p>Dermatologist</p>
            <p>Consultation Fee: ₹800</p>
            <button
              onClick={() =>
                handleBookDoctor("Dr. Alka Makhwana")
              }
            >
              Book Appointment
            </button>
          </div>
        </div>
      </section>

      <section className="form-section" ref={formRef}>
        <h2>Book Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Patient Name</label>

            <input
              type="text"
              name="patientName"
              placeholder="Enter patient name"
              value={formData.patientName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Select Doctor</label>

            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
            >
              <option value="">Select Doctor</option>

              <option>Dr. John Doe</option>
              <option>Dr. Sarah Smith</option>
              <option>Dr. Alka Makhwana</option>
            </select>
          </div>

          <div>
            <label>Date</label>

            <input
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Time</label>

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          <button type="submit">
            Confirm Appointment
          </button>
        </form>
      </section>

      <section className="appointment-section">
        <h2>Booked Appointments</h2>
        <div className="appointments-container">
          {appointments.length === 0 ? (
            <p>No appointments booked yet.</p>
          ) : (
            appointments.map((appointment, index) => (
              <div className="appointment-card" key={index}>
                <h3>{appointment.patientName}</h3>
                <p>
                  Doctor: {appointment.doctor}
                </p>
                <p>
                  Date: {appointment.date}
                </p>
                <div className="appointment-actions">
                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEditAppointment(
                        appointment,
                        index
                      )
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteAppointment(index)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Appointment Portal</p>
      </footer>
    </>
  );
}

export default App;