import {create} from "zustand";

const URL_BASE = "/o/idispenser-rest/v1.0/hubs/";

const hubStore = create((set, get) => ({


    hub: null,
    hubs: [],
    loaded: false,
    fetchHub: async (id) => {

        let url = URL_BASE + id;

        try {
            const response = await Liferay.Util.fetch(url, {
                method: 'GET'
            });

            const data = await response.json();

            set({hub: data});
            set({loaded: true});
            console.log("Fetched Hubs: " + get().hub);
            console.log("loaded: " + get().loaded);

        } catch (error) {
            console.error(error);
            set({hub: null});
        } finally {
            set({loaded: true});
        }
    },
    fetchHubs: async () => {
        let url = URL_BASE;

        console.log("loaded: " + get().loaded);


        try {
            const response = await Liferay.Util.fetch(url, {
                method: 'GET'
            });

            const data = await response.json();

            set({hubs: data.items});
            set({loaded: true});
            console.log("Fetched Hubs: " + get().hubs);
            console.log("loaded: " + get().loaded);

        } catch (error) {
            console.error(error);
            set({hubs: []});
        } finally {
            set({loaded: true});
        }


    },
    resetHubs: () => {
        set({hubs: []});
    },
    getHubs: () => {
        return get().hubs;
    },
    getHub: () => {
        return get().hub;
    },
    getloaded: () => {
        return get().loaded;
    }

}));

export default hubStore;