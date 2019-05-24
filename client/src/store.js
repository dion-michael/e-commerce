import vuex from 'vuex'
import Vue from 'vue'
import api from '@/api/config'
import Swal from 'sweetalert2'
Vue.use(vuex)

const store = new vuex.Store({
    state: {
        isLogin: false,
        cart: {},
        cartLength: 0,
        products: {},
        searchQuery: "",
        userProducts: [],
        product: {}
    },
    mutations: {
        setLogin(state, v) {
            state.isLogin = v
        },
        getCart(state, v) {
            state.cart = v
            state.cartLength = v.products.length
        },
        resetState(state) {
            state.cart = {}
            state.cartLength = 0
            state.isLogin = false
        },
        setProducts(state, products) {
            state.products = products
        },
        setUserProducts(state, v) {
            state.userProducts = v
        },
        setOneProduct(state, product) {
            state.product = product
        }
    },
    actions: {
        resetState({
            commit
        }) {
            commit('resetState')
        },
        setLogin({
            commit
        }, v) {
            commit('setLogin', v)
        },
        getCart({
            commit
        }) {
            api({
                url: '/cart',
                method: 'GET',
                headers: {
                    'token': localStorage.getItem('token')
                }
            }).then(cart => {
                commit('getCart', cart.data)
            }).catch(error => {
                console.log(error);
            })
        },
        addCart({
            commit
        }, productId) {
            console.log("masuk ke add cart");
            api({
                url: "/cart/" + productId,
                method: "POST",
                headers: {
                    'token': localStorage.getItem('token')
                }
            }).then((cart) => {
                commit("getCart", cart.data);
            }).catch(error => {
                console.log(error);
            })
        },
        getAllProducts({
            commit
        }) {
            api({
                    url: "/products",
                    method: "GET"
                })
                .then(({
                    data
                }) => {
                    commit("setProducts", data)
                })
                .catch(error => {
                    Swal.fire("The Internet?", "That thing is still around?", "question");
                });
        },
        deleteFromCart({
            commit
        }, productId) {
            api({
                url: "/cart/" + productId,
                method: "DELETE",
                headers: {
                    'token': localStorage.getItem('token')
                }
            }).then(() => {
                this.dispatch('getCart')
            })
        },
        signOut({
            commit
        }) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(result => {
                if (result.value) {
                    localStorage.removeItem("username");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("token");
                    localStorage.removeItem("cartId");
                    commit("setLogin", false);
                    this.dispatch("resetState");
                    Swal.fire("Bye!", "You've been signed out", "success");
                }
            });
        },
        getUserProducts({
            commit
        }) {
            console.log('/products/owner/' + localStorage.getItem('userId'));
            api({
                url: '/products/owner/' + localStorage.getItem('userId'),
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then(({
                data
            }) => {
                commit('setUserProducts', data)
            }).catch(error => {
                console.log(error.response);
            })
        },
        getOneProduct({
            commit
        }, productId) {
            api({
                url: "products/" + productId,
                method: "GET",
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then(found => {
                commit('setOneProduct', found.data)
            }).catch(error => {
                console.log(error.response);
            })
        },
        updateOneProduct({
            commit
        }, newData) {
            api({
                url: "products/" + newData.productId,
                method: "PUT",
                headers: {
                    token: localStorage.getItem('token')
                },
                data: newData
            }).then(success => {
                this.dispatch('getUserProducts')
                this.dispatch('getOneProduct')
            }).catch(error => {
                console.log(error.response);
            })
        }
    }
})

export default store