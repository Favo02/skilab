import React, { useState, useEffect } from "react"
import { View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { getSkiAreas } from "../services/DataAccess"

const Dropdown = ({ selectedValue, setSelectedValue }) => {
  const [data, setData] = useState([])

  // fetch skiAreas
  useEffect(() => {
    const getData = async () => {
      setData(await getSkiAreas())
    }

    getData()
  }, [])

  return (
    <View>
      <DropDownPicker
        items={data.map((item) => ({
          label: item.details.Title,
          value: item,
        }))}
        defaultValue={selectedValue}
        containerStyle={{ height: 40 }}
        onChangeItem={(item) => setSelectedValue(item)}
      />
    </View>
  )
}

export default Dropdown
