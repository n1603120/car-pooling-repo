package com.lit.spring.database.carpoolingdatabase.entities;

import javax.persistence.*;
import java.io.Serializable;

@SuppressWarnings("serial")
@Entity
@Table(name = "trips")
public class Trip implements Serializable {
  private int id;
  private int personId;
  private String postcode;
  private String town;
  private String destination;
  private String date;
  private String time;
  private int carId;
  private boolean driverStatus;

  @Id
  @Column(name = "tripid")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }
  @Column(name = "postcode")
  public String getPostcode() {
    return postcode;
  }

  public void setPostcode(String postcode) {
    this.postcode = postcode;
  }

  @Column(name = "town")
  public String getTown() {
    return town;
  }

  public void setTown(String town) {
    this.town = town;
  }

  @Column(name = "destination")
  public String getDestination() {
    return destination;
  }

  public void setDestination(String destination) {
    this.destination = destination;
  }

  @Column(name = "tripdate")
  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  @Column(name = "triptime")
  public String getTime() {
    return time;
  }

  public void setTime(String time) {
    this.time = time;
  }

  @Column(name = "carid")
  public int getCarId() {
    return carId;
  }

  public void setCarId(int carId) {
    this.carId = carId;
  }
  @Column(name = "personid")
  public int getPersonId() {
    return personId;
  }
  public void setPersonId(int personId) {
    this.personId = personId;
  }

  @Column(name = "driverstatus")
  public boolean isDriverStatus() {
    return driverStatus;
  }
  public void setDriverStatus(boolean driverStatus) {
    this.driverStatus = driverStatus;
  }

}
