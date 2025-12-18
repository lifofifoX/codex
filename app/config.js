import { parse } from 'yaml'
import storeYaml from '../config/store.yml'

export const CONFIG = parse(storeYaml)
