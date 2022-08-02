package com.lit.spring.database.carpoolingdatabase;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TripServiceApplicationTests {
  private static final MediaType JSON_CONTENT_TYPE = MediaType.parseMediaType("application/json;charset=UTF-8");

  @Autowired
  private MockMvc mockMvc;

  @Test
  public void allTripsCanBeFound() throws Exception {
    mockMvc.perform(get("/trips").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(status().isOk());
  }

  @Test
  public void tripsCanBeFoundByID() throws Exception {
    mockMvc.perform(get("/trips/byId/1").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.id").value(1))
      .andExpect(jsonPath("$.postcode").value("BT514DS"))
      .andExpect(jsonPath("$.destination").value("Belfast Office"))
      .andExpect(jsonPath("$.date").value("23/08/2022"))
      .andExpect(jsonPath("$.time").value("18:30:00"))
      .andExpect(jsonPath("$.carId").value(1))
      .andExpect(jsonPath("$.personId").value(1));
  }
  @Test
  public void tripsCanBeFoundByPersonID() throws Exception {
    mockMvc.perform(get("/trips/byPersonId/1").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.[0].id").value(1))
      .andExpect(jsonPath("$.[0].postcode").value("BT514DS"))
      .andExpect(jsonPath("$.[0].destination").value("Belfast Office"))
      .andExpect(jsonPath("$.[0].date").value("23/08/2022"))
      .andExpect(jsonPath("$.[0].time").value("18:30:00"))
      .andExpect(jsonPath("$.[0].carId").value(1))
      .andExpect(jsonPath("$.[0].personId").value(1));
  }
  @Test
  @DirtiesContext
  public void tripCanBeAddedAndRemoved() throws Exception {
    String content =
      "{\"id\": \"100\",\"postcode\": \"BT76HDS\", \"destination\": \"Belfast Office\", \"date\": \"12/12/2022\", \"time\": \"18:30\",\"carId\": \"1\",\"personId\": \"1\"}";
    mockMvc.perform(post("/trips").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isOk());
    mockMvc.perform(get("/trips").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$[?(@.id == '100')]", hasSize(1)));
    mockMvc.perform(get("/trips/byId/100").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.id").value(100))
      .andExpect(jsonPath("$.postcode").value("BT76HDS"))
      .andExpect(jsonPath("$.destination").value("Belfast Office"))
      .andExpect(jsonPath("$.date").value("12/12/2022"))
      .andExpect(jsonPath("$.time").value("18:30:00"))
      .andExpect(jsonPath("$.carId").value(1));
    mockMvc.perform(delete("/trips/100"))
      .andExpect(status().isOk());
    mockMvc.perform(get("/trips").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$[?(@.id == '100')]", hasSize(0)));
  }
  @Test
  @DirtiesContext
  public void tripIdPresentCantBeAdded() throws Exception {
    String content =
      "{\"id\": \"100\",\"postcode\": \"BT76HDS\", \"destination\": \"Belfast Office\", \"date\": \"12/12/2022\", \"time\": \"18:30\",\"carId\": \"1\",\"personId\": \"1\"}";
    mockMvc.perform(post("/trips").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isOk());
    mockMvc.perform(get("/trips").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$[?(@.id == '100')]", hasSize(1)));
    mockMvc.perform(post("/trips").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isBadRequest());
    mockMvc.perform(delete("/trips/100"))
      .andExpect(status().isOk());
  }
  @Test
  @DirtiesContext
  public void carIdNotPresentCantBeRemoved() throws Exception {
    mockMvc.perform(delete("/cars/100"))
      .andExpect(status().isBadRequest());
  }
}
