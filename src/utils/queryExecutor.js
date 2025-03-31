import {
  dummyData,
  predefinedQueries,
  randomDummyData,
} from "../data/predefinedQueries";

export function executeQuery(query) {
  // Normalizing query by removing extra whitespace and converting to lowercase
  const normalizedQuery = query.replace(/\s+/g, " ").toLowerCase().trim();

  // Checking if the query matches any of our predefined queries
  for (const predefinedQuery of predefinedQueries) {
    const normalizedPredefinedQuery = predefinedQuery.query
      .replace(/\s+/g, " ")
      .toLowerCase()
      .trim();

    // If we find a match or close match, return the corresponding dummy data
    if (
      normalizedQuery.includes(normalizedPredefinedQuery.substring(0, 20)) ||
      normalizedPredefinedQuery.includes(normalizedQuery.substring(0, 20))
    ) {
      return dummyData[predefinedQuery.name];
    }
  }

  // For any other query, returning one of the dummy data randomly
  return randomDummyData[Math.floor(Math.random() * randomDummyData.length)];
}
