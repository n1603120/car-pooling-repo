package com.lit.spring.sql.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@SuppressWarnings("serial")
@Entity
@Table(name = "cars")
public class Car implements Serializable {
  private int id;
  private int ownerId;
  private String make;
  private String registration;
  private int numOfSeats;
  private String preferredContact;
  private boolean smokingOption;
  private boolean accessibility;
  private String preferredPickUp;
  private boolean activeCar;

  @Id
  @Column(name = "carid")
  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  @Column(name = "ownerid")
  public int getOwnerId() {
    return ownerId;
  }

  public void setOwnerId(int ownerId) {
    this.ownerId = ownerId;
  }

  @Column(name = "make")
  public String getMake() {
    return make;
  }

  public void setMake(String make) {
    this.make = make;
  }

  @Column(name = "registration")
  public String getRegistration() {
    return registration;
  }

  public void setRegistration(String registration) {
    this.registration = registration;
  }

  @Column(name = "numofseats")
  public int getNumOfSeats() {
    return numOfSeats;
  }

  public void setNumOfSeats(int numOfSeats) {
    this.numOfSeats = numOfSeats;
  }

  @Column(name = "preferredcontact")
  public String getPreferredContact() {
    return preferredContact;
  }

  public void setPreferredContact(String preferredContact) {
    this.preferredContact = preferredContact;
  }

  @Column(name = "smokingoption")
  public boolean isSmokingOption() {
    return smokingOption;
  }

  public void setSmokingOption(boolean smokingOption) {
    this.smokingOption = smokingOption;
  }

  @Column(name = "accessibility")
  public boolean isAccessibility() {
    return accessibility;
  }

  public void setAccessibility(boolean accessibility) {
    this.accessibility = accessibility;
  }

  @Column(name = "preferredpickup")
  public String getPreferredPickUp() {
    return preferredPickUp;
  }

  public void setPreferredPickUp(String preferredPickUp) {
    this.preferredPickUp = preferredPickUp;
  }

  @Column(name = "activecar")
  public boolean isActiveCar() {
    return activeCar;
  }

  public void setActiveCar(boolean activeCar) {
    this.activeCar = activeCar;
  }
}
