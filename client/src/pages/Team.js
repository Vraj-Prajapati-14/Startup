import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './Team.css';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/team');
        setTeam(res.data);
      } catch (err) {
        console.error('Failed to fetch team:', err);
        setTeam([]);
      }
      setLoading(false);
    };
    fetchTeam();
  }, []);

  return (
    <div className="team-page">
      <section className="team-hero py-20 bg-gradient-primary text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">Our Team</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Meet our talented team of developers, designers, and consultants.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="team-content py-16">
  <div className="container">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-6">Team Members</h2>
      {loading ? (
        <p>Loading team members...</p>
      ) : team.length === 0 ? (
        <p>No team members found.</p>
      ) : (
        <div className="team-list">
          {team.map(member => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="team-card"
            >
              <img
                src={member.image}
                alt={member.name}
                className="team-avatar"
              />
              <div className="team-info">
                <div className="team-name">{member.name}</div>
                <div className="team-position">{member.position}</div>
                <div className="team-department">{member.department}</div>
                <div className="team-bio">{member.shortBio}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  </div>
</section>
    </div>
  );
};

export default Team;