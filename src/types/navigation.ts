export type Gear = {
  id: string
  itemName: string
  itemDescription: string
}

export type Backpack = {
  id: string
  backpackName: string
  backpackDescription: string
}

export type RootStackParamList = {
  Login: undefined
  ForgotPassword: undefined
  AddItem: undefined
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
