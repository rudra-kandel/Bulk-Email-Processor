import { Router } from 'express';

const api = () => {

    const router: Router = Router();
    //router.use(user)

    router.all("/*", (req, res) => {
        res.status(404).json({ status: false, message: "Route not found" });
    })

}

export default api;
