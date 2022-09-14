import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const proteinAdapter = createEntityAdapter({});

const initialState = proteinAdapter.getInitialState();

export const proteinApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProtein: builder.query({
      query: () => `protein`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedProtein = responseData.map((protein) => {
          protein.id = protein._id;
          return protein;
        });
        return proteinAdapter.setAll(initialState, loadedProtein);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Protein", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Protein", id })),
          ];
        } else return [{ type: "Protein", id: "LIST" }];
      },
    }),
    getProteinFromCart: builder.query({
      query: () => `protein/cart`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedProtein = responseData.map((protein) => {
          protein.id = protein._id;
          return protein;
        });
        return proteinAdapter.setAll(initialState, loadedProtein);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Protein", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Protein", id })),
          ];
        } else return [{ type: "Protein", id: "LIST" }];
      },
    }),
    addNewProtein: builder.mutation({
      query: (initialProtein) => ({
        url: "/protein",
        method: "POST",
        body: {
          ...initialProtein,
        },
      }),
      invalidatesTags: [{ type: "Protein", id: "LIST" }],
    }),
    updateProtein: builder.mutation({
      query: (initialProtein) => ({
        url: "/protein",
        method: "PATCH",
        body: {
          ...initialProtein,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Protein", id: arg.id }],
    }),
    deleteProtein: builder.mutation({
      query: ({ id }) => ({
        url: `/protein`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Protein', id },
        { type: 'Protein', id: 'PARTIAL-LIST' },
      ],
    }),
    addProteinToCart: builder.mutation({
      query: ({ id }) => ({
        url: "/protein/cart",
        method: "POST",
        body: { id },
      }),
      invalidatesTags: [{ type: "Protein", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProteinQuery,
  useGetProteinFromCartQuery,
  useAddNewProteinMutation,
  useUpdateProteinMutation,
  useDeleteProteinMutation,
  useAddProteinToCartMutation,
} = proteinApiSlice;

// returns the query result object
export const selectProteinResult = proteinApiSlice.endpoints.getProtein.select();

// creates memoized selector
const selectProteinData = createSelector(
  selectProteinResult,
  (proteinResult) => proteinResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllProtein,
  selectById: selectProteinById,
  selectIds: selectProteinIds,
  // Pass in a selector that returns the protein slice of state
} = proteinAdapter.getSelectors(
  (state) => selectProteinData(state) ?? initialState
);