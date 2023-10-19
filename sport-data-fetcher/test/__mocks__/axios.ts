import axios from 'axios';

const mockAxios = jest.genMockFromModule<jest.Mocked<typeof axios>>('axios');

// this is the key to fix the axios.create() undefined error!
mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;
