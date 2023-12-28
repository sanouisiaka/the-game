import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '@/corelogic/domain/user/user'
import { retrieveUser } from '@/corelogic/store/user/action/retrieveUser'
import { RootState } from '@/store'
import { Status } from '@/types/fetch.types'


const initialState = {
  connectedUser: {} as User,
  status: Status.IDLE
};

export const retrieveUserThunk = createAsyncThunk<User>('/user/retrieveUser', retrieveUser);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(retrieveUserThunk.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED;
      state.connectedUser = action.payload;
    })

    builder.addCase(retrieveUserThunk.rejected, (state) => {
      state.status = Status.FAILED;
    })
  }
})

export default userSlice.reducer

export const getConnectedUser = (state: RootState) => state.user.connectedUser;

export const retrieveConnectedUserStatus = (state: RootState) => state.user.status;
