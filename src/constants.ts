// src/constants.ts

  export enum Category {
    MARINE_EQUIPMENT = 'Marine Equipment',
    IT_EQUIPMENT = 'IT Equipment',
    AGRICULTURAL_EQUIPMENT = 'Agricultural Equipment',
    AUTOMOBILES = 'Automobiles',
    COLLECTIBLES = 'Collectibles',
    ART = 'Art',
    JEWELRY = 'Jewelry',
    TOYS_HOBBIES = 'Toys & Hobbies',
    SPORTS_OUTDOORS = 'Sports & Outdoors',
    HEALTH_BEAUTY = 'Health & Beauty',
    REAL_ESTATE = 'Real Estate',
    INDUSTRIAL_BUSINESS = 'Industrial & Business'
  }
  
  export enum StatusType {
    PENDING = 'Pending',
    UPCOMING = 'Upcoming',
    LIVE = 'Live'
  }  
  
  export enum Level {
    NORMAL = 'Normal',
    LATEST = 'Latest',
    POPULAR = 'Popular',
    HIGHEST_BIDDING = 'Highest Bidding'
  }

  export enum UserRole {
    Admin = 'admin', 
    Employer = 'employer', 
    Applicant = 'applicant'
  }
  
  export enum AccountStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
  }
  