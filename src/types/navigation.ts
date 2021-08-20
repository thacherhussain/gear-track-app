export type Gear = {
  id: string
  name: string
  description: string
}

export type Backpack = {
  id: string
  name: string
  description: string
}

export type RootStackParamList = {
  Login: undefined
  ForgotPassword: undefined
  AddGearItem: undefined
  GearList: undefined
  GearDetail: {
    singleItem: Gear
  }
  BackpackList: undefined
  BackpackDetail: {
    singleItem: Backpack
  }
  AddBackpack: undefined
}
