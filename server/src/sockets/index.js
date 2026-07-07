const registerSocketHandlers = (io) =>{
    //so whoever emit "connection" event so they get socket.id
    io.on("connection",(socket) =>{
        console.log("Socket connected:",socket.id);


        //clients joins a project room
        //Each project has its own room named "project:THE_PROJECT_ID"
        socket.on("join:project",(projectId)=>{
            socket.join(`project:${projectId}`);
            console.log(`socket ${socket.id} joined project:${projectId}`);
        });

        //clients leave a project room
        socket.on("leave:project",(projectId)=>{
            socket.leave(`project:${projectId}`);
            console.log(`socket ${socket.id} left project:${projectId}`);
        });

        //clients disconnects (browser tab closed)
        socket.on("disconnect",()=>{
            console.log("socket disconneted",socket.id);
        });
    });
};

module.exports = registerSocketHandlers;