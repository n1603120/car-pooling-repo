package com.lit.carpooling.rest.CarPoolingRestServiceApplicationTests;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class CarServiceApplicationTests {
  private static final MediaType JSON_CONTENT_TYPE = MediaType.parseMediaType("application/json;charset=UTF-8");

  @Autowired
  private MockMvc mockMvc;

  @Test
  public void allCarsCanBeFound() throws Exception {
    mockMvc.perform(get("/cars").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$", hasSize(4)));
  }
  @Test
  public void carsCanBeFoundByCarID() throws Exception {
    mockMvc.perform(get("/cars/byCarId/1").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.id").value(1))
      .andExpect(jsonPath("$.ownerId").value(1))
      .andExpect(jsonPath("$.make").value("Ford Fiesta"))
      .andExpect(jsonPath("$.registration").value("MFZ6536"))
      .andExpect(jsonPath("$.numOfSeats").value(4))
      .andExpect(jsonPath("$.preferredContact").value("Email"))
      .andExpect(jsonPath("$.smokingOption").value(true))
      .andExpect(jsonPath("$.accessibility").value(true))
      .andExpect(jsonPath("$.preferredPickUp").value("Ballymoney"))
      .andExpect(jsonPath("$.activeCar").value(true));
  }
  @Test
  public void carsCanBeFoundByOwnerID() throws Exception {
    mockMvc.perform(get("/cars/byCarId/2").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.id").value(2))
      .andExpect(jsonPath("$.ownerId").value(2))
      .andExpect(jsonPath("$.make").value("BMW"))
      .andExpect(jsonPath("$.registration").value("GHU6536"))
      .andExpect(jsonPath("$.numOfSeats").value(4))
      .andExpect(jsonPath("$.preferredContact").value("Phone"))
      .andExpect(jsonPath("$.smokingOption").value(false))
      .andExpect(jsonPath("$.accessibility").value(true))
      .andExpect(jsonPath("$.preferredPickUp").value("Coleraine, Ballymena"))
      .andExpect(jsonPath("$.activeCar").value(true));
  }

  @Test
  @DirtiesContext
  public void carCanBeAdded() throws Exception {
    String content =
      "{\"id\": \"5\",\"ownerId\": \"2\", \"make\": \"BMW\", \"registration\": \"KZZ6536\", \"numOfSeats\": \"4\",\"preferredContact\": \"Email\",\"smokingOption\": \"false\",\"accessibility\": \"false\",\"preferredPickUp\": \"Coleraine, Ballymena\",\"activeCar\": \"false\"}";
    mockMvc.perform(post("/cars").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isOk());
    mockMvc.perform(get("/cars").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$", hasSize(5)))
      .andExpect(jsonPath("$[?(@.id == '5')]", hasSize(1)));
    mockMvc.perform(get("/cars/byCarId/5").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.id").value(5))
      .andExpect(jsonPath("$.ownerId").value(2))
      .andExpect(jsonPath("$.make").value("BMW"))
      .andExpect(jsonPath("$.registration").value("KZZ6536"))
      .andExpect(jsonPath("$.numOfSeats").value(4))
      .andExpect(jsonPath("$.preferredContact").value("Email"))
      .andExpect(jsonPath("$.smokingOption").value(false))
      .andExpect(jsonPath("$.accessibility").value(false))
      .andExpect(jsonPath("$.preferredPickUp").value("Coleraine, Ballymena"))
      .andExpect(jsonPath("$.activeCar").value(false));
  }
  @Test
  @DirtiesContext
  public void carIdPresentCantBeAdded() throws Exception {
    String content =
      "{\"id\": \"5\",\"ownerId\": \"2\", \"make\": \"BMW\", \"registration\": \"KZZ6536\", \"numOfSeats\": \"4\",\"preferredContact\": \"Email\",\"smokingOption\": \"false\",\"accessibility\": \"false\",\"preferredPickUp\": \"Coleraine, Ballymena\",\"activeCar\": \"false\"}";
    mockMvc.perform(post("/cars").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isOk());
    mockMvc.perform(get("/cars").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$", hasSize(5)))
      .andExpect(jsonPath("$[?(@.id == '5')]", hasSize(1)));
    mockMvc.perform(post("/cars").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isBadRequest());
  }
}
