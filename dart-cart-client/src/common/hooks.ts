import { DependencyList, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be used to resolve types
