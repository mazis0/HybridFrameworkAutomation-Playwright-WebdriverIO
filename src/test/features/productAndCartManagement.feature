# @cart
Feature: Sauce Demo Web Desktop & Mobile Native - Product and Cart Management
  As a user
  I want to interact with products
  So that I can add items to cart, sort, filter, checkout, and logout
 @cart
  Scenario: Add a single product to the cart
    # Web Desktop steps
    Given the user is logged in on Web
    When the user adds "Sauce Labs Backpack" to the cart on Web
    Then the cart icon on Web should show 1 item
    And the product "Sauce Labs Backpack" should appear in the Web cart list

#     # Mobile Native steps
    Given the user is logged in on Mobile
    When the user adds "Sauce Labs Backpack" to the cart on Mobile
    Then the cart icon on Mobile should show "1" items
    And the product "Sauce Labs Backpack" should appear in the Mobile cart list
    # And the user close mobile appilication
  
  Scenario: Add multiple products to the cart
    # Web Desktop steps
    Given the user is logged in on Web
    When the user adds "Sauce Labs Backpack" to the cart on Web
    And the user adds "Sauce Labs Bike Light" to the cart on Web
    Then the cart icon on Web should show "2" items
    And both products should appear in the Web cart list

    # Mobile Native steps
    Given the user is logged in on Mobile
    When the user adds "Sauce Labs Backpack" to the cart on Mobile
    And the user adds "Sauce Labs Backpack (red)" to the cart on Mobile
    Then the cart icon on Mobile should show "2" items
    And both products should appear in the Mobile cart list
  
  Scenario: Remove a product from the cart
    # Web Desktop steps
    Given the user is logged in on Web
    And the user has added "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart on Web
    When the user removes "Sauce Labs Backpack" from the cart on Web
    Then the cart icon on Web should show "1" items
    And only "Sauce Labs Bike Light" should appear in the Web cart list

    # # Mobile Native steps
    Given the user is logged in on Mobile
    And the user has added "Sauce Labs Backpack" and "Sauce Labs Backpack (red)" to the cart on Mobile
    When the user removes "Sauce Labs Backpack" from the cart on Mobile
    Then the cart icon on Mobile should show "1" items
    And only "Sauce Labs Backpack (red)" should appear in the Mobile cart list


