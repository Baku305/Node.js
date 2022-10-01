const missingSetting = "Warning : No value set fot this ENV variable"

const config = {
 "PORT": process.env.PORT || missingSetting
}

export default config
