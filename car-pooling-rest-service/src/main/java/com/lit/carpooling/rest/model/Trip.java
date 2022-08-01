package com.lit.carpooling.rest.model;

public class Trip {
  private int id;
  private String postcode;
  private String town;
  private String destination;
  private String date;
  private String time;
  private int carId;

  public Trip(int id, String postcode, String town, String destination, String date, String time, int carId) {
    this.id = id;
    this.postcode = postcode;
    this.town = town;
    this.destination = destination;
    this.date = date;
    this.time = time;
    this.carId = carId;
  }
  public int getId() {
    return id;
  }

  public int getCarId() {
    return carId;
  }

  public void setCarId(int carId) {
    this.carId = carId;
  }
  public String getTown() {
    return town;
  }

  public void setTown(String town) {
    this.town = town;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getPostcode() {
    return postcode;
  }

  public void setPostcode(String postcode) {
    this.postcode = postcode;
  }

  public String getDestination() {
    return destination;
  }

  public void setDestination(String destination) {
    this.destination = destination;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getTime() {
    return time;
  }

  public void setTime(String time) {
    this.time = time;
  }

}
