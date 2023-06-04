import { AppState } from "../AppState.js";
import { Profile } from "../models/Profile.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class ProfilesService {
  async getProfileById(profileId) {
    const res = await api.get('api/profiles/' + profileId)
    logger.log('[found profile]', res.data)
    AppState.activeProfile = res.data
  }
  async searchProfiles(query) {
    const res = await api.get('api/profiles', { params: { query: query } })
    AppState.profiles = res.data
    logger.log('found people', res.data)
  }
}
export const profilesService = new ProfilesService