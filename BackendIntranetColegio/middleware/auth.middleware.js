//middleware/auth.middleware.js

export const requireSession = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ error: "No Autorizado" });
};

const rolesJerarquia = {
    user: 1,
    admin: 2
};
export const requireRole = (...allowedRoles) => (req, res, next) => {
    if(!req.user) return res.status(401).json({ error: "No Autorizado" });

    const userLevel = rolesJerarquia[req.user.rol] || 0;
    const maxAllowedLevel = Math.max(...allowedRoles.map(r => rolesJerarquia[r] || 0));

    if(userLevel < maxAllowedLevel) {
        return res.status(403).json({ error: "Prohibido el paso" });
    }
    next();
};

