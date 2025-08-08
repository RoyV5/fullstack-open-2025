import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    if (!Array.isArray(response.data)) {
      console.warn('Expected an array but got:', response.data)
      return []
    }
    return response.data
  } catch (error) {
    console.error('Failed to fetch persons:', error.message)
    return []  // fallback empty array on error
  }
}

const create = async newObject => {
  try {
    const response = await axios.post(baseUrl, newObject)
    return response.data
  } catch (error) {
    console.error('Failed to create person:', error.message)
    throw error  // re-throw if you want component to handle it
  }
}

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
  } catch (error) {
    console.error(`Failed to update person ${id}:`, error.message)
    throw error
  }
}

const remove = async id => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Failed to delete person ${id}:`, error.message)
    throw error
  }
}

export default { getAll, create, update, remove }