package com.lit.spring.sql.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@SuppressWarnings("serial")
@Entity
@Table(name = "people")
public class Person implements Serializable{
  private Integer id;
  private String fname;
  private String lname;
  private String email;
  private String phoneNumber;
  private String postcode;
  private String password;

  @Id
  @Column(name = "personid")
  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  @Column(name = "firstname")
  public String getFirstName() {
    return fname;
  }

  public void setFirstName(String fname) {
    this.fname = fname;
  }

  @Column(name = "lastname")
  public String getLastName() {
    return lname;
  }

  public void setLastName(String lname) {
    this.lname = lname;
  }

  @Column(name = "email")
  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  @Column(name = "phonenumber")
  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  @Column(name = "postcode")
  public String getPostcode() {
    return postcode;
  }

  public void setPostcode(String postcode) {
    this.postcode = postcode;
  }

  @Column(name = "personpassword")
  public String getPersonPassword() {
    return password;
  }

  public void setPersonPassword(String password) {
    this.password = password;
  }
}
