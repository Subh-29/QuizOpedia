import { verifyToken } from '../utils/jwt.js'

export function protect(req, res, next) {
    const authHeader = req.headers.authorization;
    // console.log();
    
    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decode = verifyToken(token);
        // console.log(decode);
        
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });

    }
}


export function requireAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admins only' });
    }
    next();
}